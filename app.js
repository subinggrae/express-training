const express = require('express');
const app = express();

app.use(express.json());

app.listen(1234);

let db = new Map();
db.set(1, { no: 1, name: '이상해씨', type: ['풀', '독'], height: 0.7, weight: 6.9 });
db.set(2, { no: 2, name: '이상해풀', type: ['풀', '독'], height: 1.0, weight: 13.0 });
db.set(3, { no: 3, name: '이상해꽃', type: ['풀', '독'], height: 2.0, weight: 100.0 });

app.get('/poketmons/:no', function(req, res) {
  let { no } = req.params;
  no = parseInt(no);
  
  if (db.get(no) == undefined) {
    res.json({
      message: '존재하지 않는 도감 번호입니다.'
    })
  } else {
    res.json(db.get(no));
  }
})

app.post('/poketmons', function(req, res) {
  let { no, name } = req.body;

  if (no == undefined) {
    res.json({
      message: '도감 번호가 비어있습니다.'
    })
  } else {
    db.set(no, req.body);
    res.json({
      message: `도감번호 ${no}번 포켓몬 ${name}(이)가 등록되었습니다.`
    })
  }
})