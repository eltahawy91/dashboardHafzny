import Skeleton from "react-loading-skeleton";
import Edit from "../../Component/img/edit.png";

export const SkeletonRow = () =>
    Array(3)
        .fill()
        .map((_, index) => (
            <div className="SkeletonRow">

            <div className="sectionOne" key={index}>
                <h1>
                    <Skeleton width={240} height={20} />
                </h1>
                <p>
                    <Skeleton width={300} height={15} />
                    <Skeleton width={250} height={15} />
                    <Skeleton width={200} height={15} />
                </p>
                <div>
                    <span>
                        <Skeleton width={240} height={5} /> محاضرات
                    </span>
                    <span>
                        <Skeleton width={240} height={5} /> ساعه
                    </span>
                </div>
                <div>
                    <span>
                        <Skeleton width={240} height={5} /> ريال
                    </span>
                    <span>
                        <Skeleton width={240} height={5} /> %
                    </span>
                </div>
                <div className="checkboxDiv">
                    <p>نشط </p>
                    <span>
                        <Skeleton  width={60} height={5} />
                    </span>
                </div>
                <div className="checkboxDiv">
                    <p>الوضع الافتراضي</p>
                    <span>
                        <Skeleton  width={60} height={5} />
                    </span>
                </div>
                <div className="checkboxDiv">
                    <p>ترتيب الباقه</p>
                    <Skeleton width={60} height={5} />
                </div>
                <div className="checkboxDiv">
                    <p className="Edit">
                        تعديل :
                        <img src={Edit} alt="" />
                    </p>
                    <p className="Edit">
                        حذف :<ion-icon name="trash-outline"></ion-icon>
                    </p>
                </div>
            </div>
            </div>

        ));
