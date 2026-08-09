/// gml_Object_impaindu2r_Alarm_10
action_set_relative(0);
action_set_alarm(20, 10);
with (r12) {
    action_set_relative(1);
    mon = mon + -1;
    action_set_relative(0);
}
action_set_relative(0);
