const express = require('express');
const app = express();
const port = 3000;
const fs = require('fs');
const formidable = require('formidable');

app.use(express.static('pagini'));
app.use('/css', express.static(__dirname + '/pagini/css'));
app.use('/img', express.static(__dirname + '/pagini/img'));
app.use('/js', express.static(__dirname + '/pagini/js'));

app.set('views', './views');
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true })); 

app.get('', (req, res) => {
  res.render('proiect');
});

app.get('/proiect', (req, res) => {
  fs.readFile('contacte.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    const content = JSON.parse(data);
    res.render('proiect', { content });
  });
});

app.get('/contact', (req, res) => {
  res.render('contact');
});

app.get('/despre', (req, res) => {
  res.render('despre');
});

app.get('/natura', (req, res) => {
  res.render('natura');
});

app.get('/soare', (req, res) => {
  res.render('soare');
});

app.post('/submit-form', (req, res) => {
  const form = formidable({ multiples: true });

  form.parse(req, (err, fields) => {
    if (err) {
      console.error(err);
      return;
    }
    const { name, email, message } = fields;//preiau datele din formular

    const newContact = { nume: name, email, mesaj: message };//creez un contact pe care sa l adaug in contacte

    fs.readFile('contacte.json', 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        return;
      }

      const contacts = JSON.parse(data);//vector de contacte cu toate de pana atunci
      contacts.push(newContact);

      const updatedData = JSON.stringify(contacts, null, 2);

      fs.writeFile('contacte.json', updatedData, 'utf8', (err) => {
        if (err) {
          console.error(err);
          return;
        }

        res.send('Contactul a fost adăugat cu succes.');
      });
    });
  });
});

app.get('/mesaje', (req, res) => {
  fs.readFile('contacte.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    const contacts = JSON.parse(data);
    const anonymousContacts = contacts.map((contact, index) => ({
      nume: `Anonim ${index + 1}`,
      mesaj: contact.mesaj
    }));
    res.render('mesaje', { anonymousContacts });
  });
});

app.use((req, res, next) => {
  res.status(404).render('error404');
});

app.listen(port, () => {
  console.log('Listening on port ' + port);
});
