// server.js
const express = require('express');
const cors = require('cors');
const pool = require('./db/pool');

require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

//given an apartment, return the people in the waitlist
app.get('/api/waitlist', async (req, res) => {
  const { preferred_apartment } = req.query;

  try {
    const result = await pool.query(
      'SELECT * FROM new_resident_waitlist WHERE preferred_apartment = $1',
      [preferred_apartment]
    );
    res.json(result.rows);
  } catch (err) {
    console.error('DB Error in /api/approved_resident:', err.stack);
    res.status(500).json({ error: 'Database error occurred' });
  }
});

//given an apartment, returns the approved resident
app.get('/api/approved_resident', async (req, res) => {
    const { assigned_apartment } = req.query;
  
    if (!assigned_apartment) {
      return res.status(400).json({ error: 'Missing query param: assigned_apartment' });
    }
  
    try {
      const result = await pool.query(
        'SELECT * FROM approved_resident WHERE assigned_apartment = $1',
        [assigned_apartment.trim()]
      );
      res.json(result.rows);
    } catch (err) {
      console.error('DB Error:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  //given an apartment, returns the current resident
  app.get('/api/current_resident', async (req, res) => {
    const { apt_number } = req.query;
  
    if (!apt_number) {
      return res.status(400).json({ error: 'Missing query param: apt_number' });
    }
  
    try {
      const result = await pool.query(
        'SELECT * FROM current_resident WHERE apt_number = $1',
        [apt_number.trim()]
      );
  
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'No resident found for that apartment' });
      }
  
      res.json(result.rows[0]);
    } catch (err) {
      console.error('DB Error in /api/current_resident:', err.stack);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  

  //fills in the current resident page
  app.get('/api/current_resident/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      // Fetch resident details
      const residentResult = await pool.query(
        'SELECT * FROM current_resident WHERE resident_id = $1',
        [id]
      );
  
      if (residentResult.rows.length === 0) {
        return res.status(404).json({ error: 'Resident not found' });
      }
  
      const resident = residentResult.rows[0];
  
      // Fetch their maintenance requests
      const requestsResult = await pool.query(
        'SELECT * FROM user_maintenance_requests WHERE resident_id = $1',
        [id]
      );
  
      // Combine data
      res.json({
        resident,
        maintenance_requests: requestsResult.rows
      });
    } catch (err) {
      console.error('DB Error in /api/current_resident/:id:', err.stack);
      res.status(500).json({ error: 'Internal server error' });
    }
  });


  //fills in the approved resident page
  app.get('/api/approved_resident/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      const result = await pool.query(
        `SELECT ar.*, wr.first_name, wr.last_name, wr.email, wr.phone_number, wr.application_date, wr.status
         FROM approved_resident ar
         JOIN new_resident_waitlist wr ON ar.waitlist_id = wr.waitlist_id
         WHERE ar.approved_id = $1`,
        [id]
      );
  
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Approved resident not found' });
      }
  
      res.json(result.rows[0]);
    } catch (err) {
      console.error('DB Error in /api/approved_resident/:id:', err.stack);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  

  //fills in the waitlist resident page
  app.get('/api/waitlist/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      const result = await pool.query(
        `SELECT * FROM new_resident_waitlist WHERE waitlist_id = $1`,
        [id]
      );
  
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Waitlist resident not found' });
      }
  
      res.json(result.rows[0]);
    } catch (err) {
      console.error('DB error in /api/waitlist/:id:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  //redirects you a maintanence request page based on a request id
  app.get('/api/user_maintenance_requests/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      const result = await pool.query(`
        SELECT umr.request_id, umr.request_date, umr.status, umr.issue_apartment,
               cr.first_name || ' ' || cr.last_name AS resident_name
        FROM user_maintenance_requests umr
        JOIN current_resident cr ON umr.resident_id = cr.resident_id
        WHERE umr.request_id = $1
      `, [id]);
  
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Request not found' });
      }
  
      res.json(result.rows[0]);
    } catch (err) {
      console.error('DB error in GET /api/user_maintenance_requests/:id:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  

  //displays apartment details based on apartment number
  app.get('/api/apartment-details/:aptNumber', async (req, res) => {
    const { aptNumber } = req.params;
  
    try {
      const current = await pool.query(
        'SELECT resident_id, first_name, last_name FROM current_resident WHERE apt_number = $1',
        [aptNumber]
      );
  
      const approved = await pool.query(
        `SELECT a.approved_id, w.first_name, w.last_name
         FROM approved_resident a
         JOIN new_resident_waitlist w ON w.waitlist_id = a.waitlist_id
         WHERE a.assigned_apartment = $1`,
        [aptNumber]
      );
  
      const waitlist = await pool.query(
        `SELECT waitlist_id, first_name, last_name
         FROM new_resident_waitlist
         WHERE preferred_apartment = $1`,
        [aptNumber]
      );
  
      res.json({
        current: current.rows[0] || null,
        approved: approved.rows[0] || null,
        waitlist: waitlist.rows,
      });
    } catch (err) {
      console.error('Error fetching apartment details:', err);
      res.status(500).json({ error: 'Failed to fetch apartment details' });
    }
  });


  //get community requests
  app.get('/api/community_requests', async (req, res) => {
    try {
      const result = await pool.query(`
        SELECT 
          mfc.request_id_community AS request_id,
          cr.first_name || ' ' || cr.last_name AS resident_name,
          s.name AS staff_name,
          mfc.request_location AS location
        FROM maintenance_for_community mfc
        JOIN current_resident cr ON mfc.resident_id = cr.resident_id
        JOIN staff s ON mfc.staff_id = s.staff_id
      `);
      res.json(result.rows);
    } catch (err) {
      console.error('DB Error in /api/community_requests:', err.stack);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  //route to access information about a specific community request
  app.get('/api/community_requests/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      const result = await pool.query(`
        SELECT 
          mfc.request_id_community AS request_id,
          cr.first_name || ' ' || cr.last_name AS resident_name,
          s.staff_id,
          s.name AS staff_name,
          mfc.request_location AS location
        FROM maintenance_for_community mfc
        JOIN current_resident cr ON mfc.resident_id = cr.resident_id
        JOIN staff s ON mfc.staff_id = s.staff_id
        WHERE mfc.request_id_community = $1
      `, [id]);
  
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Request not found' });
      }
  
      res.json(result.rows[0]); // includes staff_id now
    } catch (err) {
      console.error('DB Error in /api/community_requests/:id:', err.stack);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  
//get staff page based on id
app.get('/api/staff/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const result = await pool.query(
        `SELECT * FROM staff WHERE staff_id = $1`,
        [id]
      );
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Staff not found' });
      }
      res.json(result.rows[0]);
    } catch (err) {
      console.error('DB Error:', err.stack);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  
  //get staff maintenance requests based on id
  app.get('/api/staff/:id/requests', async (req, res) => {
    const { id } = req.params;
  
    try {
      const result = await pool.query(`
        SELECT 
          mfc.request_id_community AS request_id,
          mfc.request_location AS location,
          s.name AS staff_name
        FROM 
          maintenance_for_community mfc
        JOIN 
          staff s ON mfc.staff_id = s.staff_id
        WHERE 
          s.staff_id = $1
      `, [id]);
  
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'No requests found for this staff member' });
      }
  
      const staffName = result.rows[0].staff_name;
      const requests = result.rows.map(row => ({
        request_id: row.request_id,
        location: row.location
      }));
  
      res.json({ staff_name: staffName, requests });
    } catch (err) {
      console.error('Error in /api/staff/:id/requests:', err.stack);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  
  



app.get('/test-db', async (req, res) => {
    try {
      const result = await pool.query('SELECT 1 + 1 AS sum');
      res.send(`DB Connected: ${result.rows[0].sum}`);
    } catch (err) {
      console.error('Database connection failed:', err);
      res.status(500).send('DB connection failed');
    }
  });

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
