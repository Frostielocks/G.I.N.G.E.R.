const Ginger = require('../core/ginger.js');
let ginger = new Ginger();
const tv_name = 'taricha';

let options = {
  hostname: 'localhost',
  port: 7896,
  method: 'POST',
  path: '/' + tv_name + '/on',
}
let onInputTunnel = ginger.createHTTPInputTunnel(options)

options.path = '/' + tv_name + '/off';
let offInputTunnel = ginger.createHTTPInputTunnel(options)

options.path = '/' + tv_name + '/source';
sourceInputTunnel = ginger.createHTTPInputTunnel(options, (req, res) => {
  let source = req.body.source;
  console.log('in source');
  if (typeof(source) === 'number' && source >= 0 && source <= 9) {
    return source;
  }
   throw "THAT WAS A BAD NUMBER";
});


options = {
  hostname: '192.168.222.164',
  port: 8123,
  method: 'POST',
  path: '/api/states/input_boolean.' + tv_name,
  headers: {
    "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJkNDE5ZmFhODk3MzQ0NjViODMxZWRhMmRhYWEwYjc3NCIsImlhdCI6MTU5NzQxMTgzOSwiZXhwIjoxOTEyNzcxODM5fQ.r1LwULDi8gQ3b7jSNXITqrA7b1mJveOkJHPhFpzuQVU",
    "content-type": "application/json"
  }
}
let onOutputTunnel = ginger.createHTTPOutputTunnel(options, (data) => {
  return JSON.stringify({state: 'on'});
});

let offOutputTunnel = ginger.createHTTPOutputTunnel(options, (data) => {
  return JSON.stringify({state: 'off'});
});

options.path = '/api/states/input_select.' + tv_name
let sourceOutputTunnel = ginger.createHTTPOutputTunnel(options, (data) => {
  return JSON.stringify({source: data});
});


ginger.createHDMICECTVTrick(tv_name,
  [onInputTunnel], [offInputTunnel], [sourceInputTunnel],
  [onOutputTunnel], [offOutputTunnel], [sourceOutputTunnel])

// options.headers = {"content-type": "application/json"};
// outputTunnel = ginger.createHTTPOutputTunnel(options, (data) => {
//   return JSON.stringify({source: data});
// });
// outputTunnel.emit(1);
