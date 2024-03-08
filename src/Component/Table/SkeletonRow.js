import Skeleton from "react-loading-skeleton";
import editImg from "../img/tabler_edit.png";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import deleteImg from "../img/material-symbols_delete.png";

export const SkeletonRow = ({ columns , path } ) => (
    <TableBody>
        {columns.map((column) => {
            if (column.id === "action") {
                return (
                    <TableCell key={column.id} align={column.align}>
                        <img className="delete" src={deleteImg} alt="" />
                        {path !== "/notifications" &&
                            path !== "/Rating" &&
                            path !== "/alerts" &&
                            path !== "/subscriptions" && (
                                <img src={editImg} alt="" />
                            )}
                    </TableCell>
                );
            } else if (column.id === "image") {
                return (
                    <TableCell key={column.id} align={column.align}>
                        <Skeleton variant="rect" width={60} height={60} />
                    </TableCell>
                );
            } else if (column.id === "rating") {
                return (
                    <TableCell className="rating" key={column.id} align={column.align}>
                        <Skeleton width={100} height={20} />
                    </TableCell>
                );
            } else {
                return (
                    <TableCell key={column.id} align={column.align}>
                        <Skeleton width={column.width || 100} height={20} />
                    </TableCell>
                );
            }
        })}
    </TableBody>
);
