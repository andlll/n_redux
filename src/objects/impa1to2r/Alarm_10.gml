/// gml_Object_impa1to2r_Alarm_10
action_set_relative(0);
action_set_alarm(10, 10);
with (r12) {
    action_set_relative(1);
    mon = mon + -2;
    action_set_relative(0);
}
action_set_relative(0);
