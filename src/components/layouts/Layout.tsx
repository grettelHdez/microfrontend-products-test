import Head from "next/head"
import { FC, useState } from "react"
import { Navbar } from "../ui"
import { Sidebar } from "../ui/Sidebar"
import { Props } from "@/interfaces/ui"

export const Layout: FC<Props> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <>
      <Head>
        <title>Products</title>
        <meta name="author" content="Grettel Hernandez"></meta>
        <meta name="description" content="Información sobre productos"></meta>
        <meta name="keywords" content="product"></meta>
      </Head>
      <div id="page-content">
        <Sidebar collapsed={collapsed} />
        <div className="content">
          <Navbar collapsed={collapsed} setCollapsed={setCollapsed} />
          <main className="overflow-auto" style={{ margin: "24px 16px", padding: 24, background: "#fff", minHeight: 280 }}>
            {children}
          </main>
        </div>
      </div>
    </>
  )
}
