"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { add } from "./action";
import { useState } from "react";

export default function Home() {
  const [data, setData] = useState({
    message: "",
    items: [],
  });

  const handleSubmit = async (formData) => {
    setData({ ...data, message: "" });
    const result = await add(formData);

    setData({ ...data, message: result.message });

    if (result.ok) {
      const now = new Date();
      setData({
        ...data,
        items: [
          ...data.items,
          {
            key: now.valueOf(),
            value: `${now.getDate().toString().padStart(2, "0")}/${(
              now.getMonth() + 1
            )
              .toString()
              .padStart(2, "0")}/${now.getFullYear()} ${now
              .getHours()
              .toString()
              .padStart(2, "0")}:${now
              .getMinutes()
              .toString()
              .padStart(2, "0")}`,
          },
        ],
      });
    }
  };

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        Últimas batidas
        <ol>
          {data.items.map((item) => (
            <li key={item.key}>{item.value}</li>
          ))}
        </ol>
        <div className={styles.ctas}>
          <form action={handleSubmit} noValidate>
            <input type="password" name="key" />
            <button className={styles.primary}>
              <Image
                className={styles.logo}
                src="/vercel.svg"
                alt="Vercel logomark"
                width={20}
                height={20}
              />
              Bater Ponto
            </button>
            <p aria-live="polite">{data?.message}</p>
          </form>
        </div>
      </main>
    </div>
  );
}
