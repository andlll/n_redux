/// gml_Object_sold12_Alarm_0
action_set_relative(1);
with (r12) {
    mon = mon + 240;
}
action_kill_object();
action_set_relative(0);
