async function getUsers() {
    let res = await (
      await fetch(`/getusers`, {
        method: "GET",
      })
    ).json();
    return res;
  };