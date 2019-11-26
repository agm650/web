import React from "/vendor/react";
import {
  Theme,
  makeStyles,
  createStyles,
  Typography,
} from "/vendor/@material-ui/core";
import classNames from "/vendor/classnames";
import useReqContext from "/lib/component/util/useReqContext";

import { useRouter, NamespaceLink } from "/lib/component/util";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingTop: "32px",
      maxWidth: "950px",
    },
    text: {
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
    },
    list: {
      width: "100%",
      textDecoration: "none",
    },
    listItem: {
      display: "inline",
      marginRight: "16px",
      color: theme.palette.text.primary,
    },
    link: {
      color: theme.palette.text.primary,
    },
  }),
);

const Breadcrumbs = () => {
  const classes = useStyles();
  const router = useRouter();
  const { namespace, cluster } = useReqContext();
  const links = router.location.pathname.split("/");
  const placement = links.indexOf(namespace) + 1;
  const url = `/${links[placement]}`;
  return (
    <div className={classes.root}>
      <Typography className={classes.text} variant="body1">
        <ul>
          {cluster && (
            <li className={classes.listItem}>
              <NamespaceLink
                cluster={cluster}
                className={classes.link}
                to={"/"}
              >
                {cluster}
              </NamespaceLink>
            </li>
          )}

          <li className={classes.listItem}>></li>

          <li className={classes.listItem}>
            <NamespaceLink
              namespace={namespace}
              className={classes.link}
              to={"/"}
            >
              {namespace}
            </NamespaceLink>
          </li>

          <li className={classes.listItem}>></li>

          <li className={classes.listItem}>
            <NamespaceLink
              namespace={namespace}
              className={classes.link}
              to={url}
            >
              {links[placement]}
            </NamespaceLink>
          </li>
        </ul>
      </Typography>
    </div>
  );
};

export default Breadcrumbs;
