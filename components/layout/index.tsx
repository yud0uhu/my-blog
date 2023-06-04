import Header from "../header";
import { createStyles, getBreakpointValue, rem, em } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  container: {
    height: rem(100),
    // backgroundColor: theme.colors.blue[6],

    // Media query with value from theme
    [`@media (max-width: ${em(getBreakpointValue(theme.breakpoints.xl) - 1)})`]:
      {},

    // Simplify media query writing with theme functions
    [theme.fn.smallerThan("lg")]: {},

    // Static media query
    [`@media (max-width: ${em(800)})`]: {},
  },
}));

type Props = {
  children: React.ReactNode;
};

const Layout: React.FC<Props> = (props) => {
  const { classes } = useStyles();
  return (
    <div className={classes.container}>
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
};

export default Layout;
