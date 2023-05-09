import Header from "../header";

type Props = {
  children: React.ReactNode;
};
const Layout: React.FC<Props> = (props) => (
  <div>
    <Header />

    <div className="layout">{props.children}</div>
    <style jsx global>{`
      html {
        box-sizing: border-box;
      }

      *,
      *:before,
      *:after {
        box-sizing: inherit;
      }

      body {
        margin: 0;
        padding: 0;
        font-size: 16px;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
          Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
          "Segoe UI Symbol";
        /* background-color: rgb(240, 235, 235); */
        /* background-image: url(https://beiz.jp/images_M/japanese-paper/japanese-paper_00193.jpg); */
        background-color: rgba(240, 235, 235, 0.8);
        background-blend-mode: lighten;
      }

      input,
      textarea {
        font-size: 16px;
      }

      button {
        cursor: pointer;
      }
    `}</style>
    <style jsx>{`
      .layout {
        padding: 0 2rem;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 70px;
      }
    `}</style>
  </div>
);

export default Layout;
