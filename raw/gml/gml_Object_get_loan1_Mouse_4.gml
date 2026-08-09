/// gml_Object_get_loan1_Mouse_4
action_set_relative(1);
with (r12) {
    mon = mon + 25000;
}
with (repre) {
    action_set_relative(0);
    loan_uno = 36;
    action_set_relative(1);
}
with (bankbuttoner) {
    action_set_relative(0);
    loaned = 1;
    action_set_relative(1);
}
action_set_relative(0);
