import { DeleteAdmins } from "./DeleteFunction";

export const Delete = async (id, path) => {
  if (path === "/Dashboard/notifications") {
    DeleteAdmins(
      `notifications/${id}`,
      `${path}`,
      "حذف هذا الاشعار",
      "هل انت متاكد انك تريد حذف هذا الاشعار"
    );
  } else if (path === "/Dashboard/mainPrivatePages") {
    DeleteAdmins(
      `pages/${id}`,
      `${path}`,
      "حذف الصفحه",
      "هل انت متاكد انك تريد حذف هذا الصفحه"
    );
  } else if (path === "/Dashboard/Rating") {
    DeleteAdmins(
      `reviews/${id}`,
      `${path}`,
      "حذف التقيم",
      "هل انت متاكد انك تريد حذف هذا التقيم"
    );
  } else if (path === "/Dashboard/alerts") {
    DeleteAdmins(
      `alerts/${id}`,
      `${path}`,
      "حذف التنبيه",
      "هل انت متاكد انك تريد حذف هذا التنبيه"
    );
  } else if (path === "/Dashboard/subscription") {
    DeleteAdmins(
      `subscriptions/${id}`,
      `${path}`,
      "حذف الاشتراكات",
      "هل انت متاكد انك تريد حذف هذا الاشتراك"
    );
  } else if (path === "/Dashboard/Sessions") {
    DeleteAdmins(
      `lectures/${id}`,
      `${path}`,
      "حذف الحصه",
      "هل انت متاكد انك تريد حذف هذا الحصه"
    );
  } else if (path === "/Dashboard/notifications") {
    DeleteAdmins(
      `notifications/${id}`,
      `${path}`,
      "حذف الاشعار",
      "هل انت متاكد انك تريد حذف هذا الاشعار"
    );
  }
  if (path === "/Dashboard/paymentAccount") {
    DeleteAdmins(
      `payment-accounts/${id}`,
      `${path}`,
      "حذف الحساب",
      "هل انت متاكد انك تريد حذف هذا الحساب"
    );
  }
  if (path === "/Dashboard/mainPrivatePages") {
    DeleteAdmins(
      `pages/${id}`,
      `${path}`,
      "حذف الصفحة",
      "هل انت متاكد انك تريد حذف الصفحة "
    );
  } else if (path === "/Dashboard/currency") {
    DeleteAdmins(
      `currencies/${id}`,
      `${path}`,
      "حذف العملة",
      "هل انت متاكد انك تريد حذف العملة "
    );
  } else if (path === "/Dashboard/teacher") {
    DeleteAdmins(
      `users/${id}`,
      `${path}`,
      "حذف المستخدم",
      "هل انت متاكد انك تريد حذف المستخدم "
    );
  } else {
    DeleteAdmins(
      `users/${id}`,
      `${path}`,
      "حذف المستخدم",
      "هل انت متاكد انك تريد حذف هذا المستخدم"
    );
  }
};
