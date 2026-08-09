/// gml_Object_sold30_Alarm_0
action_set_relative(1);
with (r12) {
    mon = mon + 600;
}
action_kill_object();
action_set_relative(0);
