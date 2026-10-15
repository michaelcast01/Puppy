import { test, expect } from "@playwright/test";

test("completar una rutina persiste al recargar", async ({ page }) => {
  await page.goto("/");
  const routine = page.getByRole("button", { name: /Su plato favorito/ });
  await expect(routine).toBeEnabled();
  await routine.click();
  await expect(routine).toHaveAttribute("aria-pressed", "true");
  await expect(page.getByText("2 de 3 completados")).toBeVisible();
  await page.reload();
  await expect(routine).toHaveAttribute("aria-pressed", "true");
  await routine.click();
  await expect(routine).toHaveAttribute("aria-pressed", "false");
});

test("crear, completar y eliminar un recordatorio", async ({ page }) => {
  await page.goto("/agenda");
  await page.getByRole("button", { name: "Nuevo recordatorio" }).click();
  await page
    .getByLabel("¿Qué quieres recordar?")
    .fill("Comprar alimento de Milo");
  await page.getByLabel("Fecha", { exact: true }).fill("2026-11-20");
  await page.getByLabel("Hora", { exact: true }).fill("15:30");
  await page.getByLabel(/Una nota/).fill("Su alimento habitual");
  await page.getByRole("button", { name: "Guardar recordatorio" }).click();
  let card = page
    .getByRole("article")
    .filter({ hasText: "Comprar alimento de Milo" });
  await expect(card).toBeVisible();
  await page.reload();
  await expect(card).toBeVisible();
  await card.getByRole("button", { name: "Completar", exact: true }).click();
  await expect(card).toHaveCount(0);
  await page.getByRole("button", { name: "Completados", exact: true }).click();
  card = page
    .getByRole("article")
    .filter({ hasText: "Comprar alimento de Milo" });
  await expect(card).toBeVisible();
  await card.getByRole("button", { name: /Eliminar/ }).click();
  await expect(card).toHaveCount(0);
  await expect(page.getByText("Cada cuidado tendrá su lugar")).toBeVisible();
});

test("editar mascota actualiza la bienvenida y persiste", async ({ page }) => {
  await page.goto("/mascota");
  await page.getByRole("button", { name: "Editar perfil" }).click();
  await page.getByLabel("Nombre", { exact: true }).fill("Luna");
  await page.getByRole("button", { name: "Guardar perfil" }).click();
  await expect(
    page.getByRole("heading", { name: "El mundo de Luna" }),
  ).toBeVisible();
  await page.goto("/");
  await expect(page.getByRole("link", { name: "Conoce a Luna" })).toBeVisible();
});

test("datos corruptos se recuperan y un nuevo día reinicia rutinas", async ({
  page,
}) => {
  await page.goto("/");
  await page.evaluate(() =>
    localStorage.setItem("puppy.care.v1", "invalid-json"),
  );
  await page.reload();
  await expect(
    page.getByRole("button", { name: /Un paseo para explorar/ }),
  ).toBeEnabled();
  await page.evaluate(() => {
    const data = JSON.parse(localStorage.getItem("puppy.care.v1")!);
    data.routineDay = "2020-01-01";
    localStorage.setItem("puppy.care.v1", JSON.stringify(data));
  });
  await page.reload();
  await expect(page.getByText("0 de 3 completados")).toBeVisible();
});

test("capturas desktop y móvil sin desbordamiento ni errores", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");
  await expect(
    page.getByRole("button", { name: /Su plato favorito/ }),
  ).toBeEnabled();
  await page.screenshot({
    path: "docs/screenshots/app-desktop.png",
    fullPage: true,
  });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.screenshot({ path: "docs/screenshots/app-mobile.png" });
  for (const path of ["/", "/mascota", "/agenda", "/identidad"]) {
    await page.goto(path);
    await expect(page.locator("h1")).toBeVisible();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBe(true);
  }
  await expect(
    page.getByRole("img", { name: /Logotipo original Puppy/ }),
  ).toBeVisible();
  expect(errors).toEqual([]);
});
