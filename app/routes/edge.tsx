export const config = { runtime: "edge" };

export async function loader() {
  const entity = "Hello, world!"
	const entityUint8 = new TextEncoder().encode(entity) // encode as (utf-8) Uint8Array
	const hashBuffer = await crypto.subtle.digest('SHA-256', entityUint8) // hash the message
	const hashArray = Array.from(new Uint8Array(hashBuffer)) // convert buffer to byte array
	const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('') // convert bytes to hex string

	const etag = '"' + hashBuffer.byteLength.toString(16) + '-' + hashHex + '"'

  return new Response(entity, {
    headers: {
      "content-type": "text/plain",
      "cache-control": "public, max-age=60",
      "etag": etag,
    },
  });
}

export default function Edge() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>Welcome to Remix@Edge</h1>
    </div>
  );
}
