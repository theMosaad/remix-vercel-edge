import type { ActionArgs, LoaderArgs } from "@remix-run/server-runtime";
import { json } from "@remix-run/server-runtime";
import { Form, useActionData, useLoaderData } from "@remix-run/react";

export const loader = async ({ request }: LoaderArgs) => {
  return json({ url: request.url });
};

export const action = async ({ request }: ActionArgs) => {
  const formData = await request.formData();
  const name = formData.get("name");

  return json({ name });
};

export default function Index() {
  const loaderData = useLoaderData<typeof loader>();
  console.log(loaderData.url);
  const actionData = useActionData<typeof action>();
  console.log(actionData?.name);

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>Welcome to Remix</h1>
      <Form method="post">
        <label>
          Name
          <input type="text" name="name" defaultValue="Mosaad" />
        </label>
        <button>
            Submit
        </button>
      </Form>
    </div>
  );
}
