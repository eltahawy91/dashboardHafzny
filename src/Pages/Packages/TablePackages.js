import { React, useEffect } from "react";
import { DeleteAdmins } from "../../Component/function/Delete/DeleteFunction";
import "react-loading-skeleton/dist/skeleton.css";
import Edit from "../../Component/img/edit.png";
import { useNavigate } from "react-router-dom";
import { SkeletonRow } from "./Skeletonrow";

function TableProduct(props) {
  const navigate = useNavigate();

  useEffect(() => {
    const login = localStorage.getItem("login");
    if (login === null) {
      window.location.href = "/Dashboard";
    }
  }, []);

  const Delete = async (id) => {
    DeleteAdmins(
      `plans/${id}`,
      "packages",
      "حذف هذه الباقه",
      "هل انت متاكد انك تريد حذف هذا الباقه"
    );
  };

  return (
    <div className="TablePackages" dir="rtl">
      {props.data ? (
        props.data.map((res) => {
          return (
            <div className="sectionOne" key={res.id}>
              <h1>{res.name}</h1>
              <p>{res.description}</p>
              {/* <h2> مميزات الباقه </h2> */}
              {/* <ul>
                                {features.map((feacter) => {
                                    return (
                                        <li key={feacter} >{feacter}</li>
                                    )
                                })}
                            </ul> */}
              <div>
                <span> {res.max_lectures} محاضرات </span>
                <span> {res.total_hours} ساعه </span>
              </div>
              <div>
                <span> {res.price} ريال </span>
                <span> {res.discount} % </span>
              </div>
              <div className="checkboxDiv">
                <p>نشط </p>
                <span>
                  <input type="checkbox" checked={res.status === "active"} />
                </span>
              </div>
              <div className="checkboxDiv">
                <p>الوضع الافتراضي</p>
                <span>
                  <input type="checkbox" checked={res.is_default === 1} />
                </span>
              </div>
              <div className="checkboxDiv">
                <p>ترتيب الباقه</p>
                <p className="number">{res.sort_order}</p>
              </div>
              {res.name === "الباقة المجانية" ? null : (
                <div className="checkboxDiv">
                  <p
                    className="Edit"
                    onClick={() =>
                      navigate(`/Dashboard/FormPackages/${res.id}`)
                    }
                  >
                    تعديل :
                    <img src={Edit} alt="" />
                  </p>
                  <p className="Edit" onClick={() => Delete(res.id)}>
                    حذف :<ion-icon name="trash-outline"></ion-icon>
                  </p>
                </div>
              )}
            </div>
          );
        })
      ) : (
        <SkeletonRow />
      )}
    </div>
  );
}

export default TableProduct;
