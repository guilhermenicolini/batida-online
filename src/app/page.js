"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { add } from "./action";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

export default function Home() {
  const { register, handleSubmit, reset } = useForm();

  const [data, setData] = useState({
    message: "",
    items: [],
  });

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("items") ?? "[]");
    setData({ ...data, items });
  }, []);

  const submit = async (formData) => {
    setData({ ...data, message: "" });
    const result = await add(formData);

    if (result.ok) {
      const now = new Date();
      let items = data.items;
      items.push({
        key: now.valueOf(),
        value: `${now.getDate().toString().padStart(2, "0")}/${(
          now.getMonth() + 1
        )
          .toString()
          .padStart(2, "0")}/${now.getFullYear()} ${now
          .getHours()
          .toString()
          .padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`,
      });

      items = items.reverse().slice(0, 6);

      setData({
        ...data,
        message: result.message,
        items,
      });
      localStorage.setItem("items", JSON.stringify(items));
    } else {
      setData({ ...data, message: result.message });
    }
    reset();
  };

  const clear = async () => {
    setData({ ...data, items: [] });
    localStorage.setItem("items", JSON.stringify([]));
  };

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        Últimas batidas
        <ol reversed>
          {data.items.map((item) => (
            <li key={item.key}>{item.value}</li>
          ))}
        </ol>
        <div className={styles.ctas}>
          <form action={handleSubmit(submit)} noValidate>
            <input type="password" {...register("key")} placeholder="key" />
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
            <button
              className={styles.secondary}
              type="button"
              onClick={() => clear()}
            >
              Limpar Pontos
            </button>
            <p aria-live="polite">{data?.message}</p>
          </form>
        </div>
      </main>
    </div>
  );
}
