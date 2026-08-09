/// gml_Object_bargia_Mouse_10
action_set_relative(1);
with (r12) {
    ele = ele + 1100;
}
action_kill_object();
action_effect(2, 0, 0, 1, 65535, 0);
action_set_relative(0);
