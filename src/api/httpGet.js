export const httpGet = (url, options) => {
  let xmlHttpReq = new XMLHttpRequest();
  xmlHttpReq.open("GET", url);
  xmlHttpReq.send(options);
  // console.log(xmlHttpReq.responseText)
  return xmlHttpReq.responseText;
};
