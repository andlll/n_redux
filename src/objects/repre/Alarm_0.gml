/// gml_Object_repre_Alarm_0
// locals: __b__
action_set_relative(0);
action_set_alarm(300, 0);
__b__ = action_if_variable(mon, 12, 1);
if (__b__) {
    action_set_relative(1);
    mon = mon + 1;
    action_set_relative(0);
} else {
    mon = 1;
}
__b__ = action_if_variable(loan_uno, 0, 2);
if (__b__) {
    action_set_relative(1);
    loan_uno = loan_uno + -1;
    action_set_relative(0);
    with (r12) {
        action_set_relative(1);
        mon = mon + -840;
        action_set_relative(0);
    }
}
__b__ = action_if_variable(loan_due, 0, 2);
if (__b__) {
    action_set_relative(1);
    loan_due = loan_due + -1;
    action_set_relative(0);
    with (r12) {
        action_set_relative(1);
        mon = mon + -1680;
        action_set_relative(0);
    }
}
__b__ = action_if_variable(loan_tre, 0, 2);
if (__b__) {
    action_set_relative(1);
    loan_tre = loan_tre + -1;
    action_set_relative(0);
    with (r12) {
        action_set_relative(1);
        mon = mon + -3333;
        action_set_relative(0);
    }
}
__b__ = action_if_variable(loan_quattro, 0, 2);
if (__b__) {
    action_set_relative(1);
    loan_quattro = loan_quattro + -1;
    action_set_relative(0);
    with (r12) {
        action_set_relative(1);
        mon = mon + -8400;
        action_set_relative(0);
    }
}
action_set_relative(0);
