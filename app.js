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
  let poketmons = [...db.values()];
  let hasData = db.size;

  if (hasData) {
    poketmons.sort((a, b) => a.no - b.no);
    res.json(poketmons);
  } else {
    res.json({
      message: '도감이 비어있습니다.'
    });
  }
})

/**
 * 특정 번호의 포켓몬을 조회한다.
 */
app.get('/poketmons/:no', function (req, res) {
  let no = parseInt(req.params.no);
  let hasData = db.get(no);

  if (hasData) {
    res.json(db.get(no));
  } else {
    res.status(404).json({
      message: `${no}번의 포켓몬을 찾을 수 없습니다.`
    });
  }
})

/**
 * 포켓몬을 도감에 등록합니다.
 */
app.post('/poketmons', function (req, res) {
  let { no, name } = req.body;
  let hasData = db.get(no);
  let hasBody = no && name;
  let status, message;

  if (hasBody && !hasData) {
    db.set(no, req.body);
    status = 201;
    message = `도감번호 ${no}번 포켓몬 ${name}(이)가 등록되었습니다.`
  } else {
    status = 400;
    message = '등록하고 싶은 도감 번호와 포켓몬 정보를 다시 확인해주세요.'
  }

  res.status(status).json({
    'message': message
  });
})

/**
 * 포켓몬 정보를 수정합니다.
 */
app.put('/poketmons/:no', function (req, res) {
  let no = parseInt(req.params.no);
  let hasData = db.get(no);
  let status, message;

  if (hasData) {
    db.set(no, req.body);
    status = 200;
    message = `${no}번 포켓몬 정보가 수정되었습니다.`
  } else {
    status = 404;
    messasge = `${no}번의 포켓몬을 찾을 수 없습니다.`
  }

  res.status(status).json({
    'message': message
  });
})

/**
 * 도감 전체를 삭제합니다.
 */
app.delete('/poketmons', function (req, res) {
  let status, message;
  let hasData = db.size

  if (hasData) {
    db.clear();
    status = 200;
    message = '도감이 초기화되었습니다.'
  } else {
    status = 404;
    message =  '도감이 이미 비어있습니다.'
  }

  res.status(status).json({
    'message': message
  });
})

/**
 * 포켓몬을 삭제합니다.
 */
app.delete('/poketmons/:no', function (req, res) {
  let no = parseInt(req.params.no);
  let hasData = db.get(no);
  let status, message;

  if (hasData) {
    db.delete(no);
    status = 200;
    message = `${poketmon.name}(이)가 도감에서 삭제되었습니다.`
  } else {
    status = 404;
    message = `${no}번의 포켓몬을 찾을 수 없습니다.`
  }

  res.status(status).json({
    'message': message
  });
})