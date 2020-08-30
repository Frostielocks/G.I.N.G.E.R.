const Ginger = require('../core/ginger.js');
const ginger = new Ginger(true);

const options = {
  hostname: '0.0.0.0',
  port: 8124,
}

const tv_name = 'taricha'
const paths = [
  {method: 'POST', path: '/api/services/counter/increment'},
  {method: 'POST', path: '/api/states/input_boolean.amnirana_motion_detector'}
]

let tunnel = ginger.createMyLogLogOutputTunnel('Tester');
for (i in paths) {
  let echoTunnel = ginger.createHTTPInputTunnel(Object.assign(paths[i], options), undefined, undefined, undefined, tunnel);
  echoTunnel.on((data) => {
    console.log(data);
  })
}
