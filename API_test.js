fetch('http://localhost:3000/upload', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify()
})
.then(response => response.json())
.then(data => console.log(data.result))
.catch(error => console.error(error));