const app = require('./app');

const PORT = process.env.PORT || 6000;

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
