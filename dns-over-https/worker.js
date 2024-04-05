export const onRequestGet = async ({
  request,
}) => {
  const clientUA = request.headers.get(`User-Agent`);
  const clientIP = request.headers.get(`CF-Connecting-IP`);
  const clientASN = request.cf.asn;
  const clientISP = request.cf.asOrganization;
  const cloudflareColo = request.cf.colo;
  const { httpProtocol } = request.cf;
  const { tlsCipher } = request.cf;
  const { tlsVersion } = request.cf;
  const clientCO = request.cf.country;
  const clientCI = request.cf.city;
  const clientRE = request.cf.region;
  const clientLAT = request.cf.latitude;
  const clientLON = request.cf.longitude;
  const clientPC = request.cf.postalCode;
  const clientTZ = request.cf.timezone;
  if (clientUA.includes("Mozilla")) {
    return new Response(`Public IP: ${clientIP}\n`
            + `ASN: ${clientASN}\n`
            + `ISP: ${clientISP}\n`
            + `Cloudflare Data Center: ${cloudflareColo}\n`
            + `HTTP Protocol: ${httpProtocol}\n`
            + `TLS Cipher: ${tlsCipher}\n`
            + `TLS Version: ${tlsVersion}\n`
            + `Country: ${clientCO}\n`
            + `City: ${clientCI}\n`
            + `Region: ${clientRE}\n`
            + `Latitude, Longitude: ${clientLAT},${clientLON}\n`
            + `Postal Code: ${clientPC}\n`
            + `Timezone: ${clientTZ}\n`
            + `User Agent: ${clientUA}\n`, {
      status: 200,
    });
  }
  else { 
    return new Response(
    `{\n "ip": "${clientIP}",\n`
            + ` "org": "AS${clientASN} ${clientISP}",\n`
            + ` "cfdc": "${cloudflareColo}",\n`
            + ` "protocol": "${httpProtocol}",\n`
            + ` "cipher": "${tlsCipher}",\n`
            + ` "tlsversion": "${tlsVersion}",\n`
            + ` "country": "${clientCO}",\n`
            + ` "city": "${clientCI}",\n`
            + ` "region": "${clientRE}",\n`
            + ` "loc": "${clientLAT},${clientLON}",\n`
            + ` "postal": "${clientPC}",\n`
            + ` "timezone": "${clientTZ}",\n`
            + ` "useragent": "${clientUA}"\n}\n`,

    {
      status: 200,
    },
  );
  }
};