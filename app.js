const express = require('express');
const app = express();

app.use(express.json());

app.listen(1234);

let db = new Map();
db.set(1, { no: 1, name: '이상해씨', type: ['풀', '독'], height: 0.7, weight: 6.9 });
db.set(2, { no: 2, name: '이상해풀', type: ['풀', '독'], height: 1.0, weight: 13.0 });
db.set(3, { no: 3, name: '이상해꽃', type: ['풀', '독'], height: 2.0, weight: 100.0 });

/**
 * 도감을 전체 조회한다.
 */
app.get('/poketmons', function (req, res) {
  let poketmons = {};
  db.forEach((value) => {
    poketmons[value.no] = value;
  })

  res.json(poketmons);
})

/**
 * 특정 번호의 포켓몬을 조회한다.
 */
app.get('/poketmons/:no', function (req, res) {
  let { no } = req.params;
  no = parseInt(no);
  
  let poketmon = db.get(no);
  if (!poketmon) {
    res.json({
      message: '도감에 등록되지 않은 번호입니다.'
    })
  } else {
    res.json(db.get(no));
  }
})

/**
 * 포켓몬을 도감에 등록합니다.
 */
app.post('/poketmons', function (req, res) {
  let { no, name } = req.body;

  let poketmon = db.get(no);
  let msg;
  if (poketmon) {
    msg = '이미 등록이 완료된 도감번호입니다.'
  } else {
    db.set(no, req.body);
    msg = `도감번호 ${no}번 포켓몬 ${name}(이)가 등록되었습니다.`
  }

  res.json({
    message: msg
  });
})

/**
 * 포켓몬 정보를 수정합니다.
 */
app.put('/poketmons/:no', function (req, res) {
  let { no } = req.params;
  no = parseInt(no);

  let poketmon = db.get(no);
  let msg;
  if (!poketmon) {
    msg = `${no}번은 도감에 등록되지 않은 번호입니다.`
  } else {
    db.set(no, req.body);
    msg = `${no}번 포켓몬 정보가 수정되었습니다.`
  }

  res.json({
    message: msg
  });
})

/**
 * 도감 전체를 삭제합니다.
 */
app.delete('/poketmons', function (req, res) {
  let msg;
  if (!db.size) {
    msg =  '도감에 등록된 포켓몬이 존재하지 않습니다.'
  } else {
    db.clear();
    msg = '도감이 초기화되었습니다.'
  }

  res.json({
    message: msg
  });
})

/**
 * 포켓몬을 삭제합니다.
 */
app.delete('/poketmons/:no', function (req, res) {
  let { no } = req.params;
  no = parseInt(no);

  let poketmon = db.get(no);
  let msg;
  if (!poketmon) {
    msg = `${no}번은 도감에 등록되지 않은 번호입니다.`
  } else {
    db.delete(no);
    msg = `${poketmon.name}(이)가 도감에서 삭제되었습니다.`
  }

  res.json({
    message: msg
  });
})