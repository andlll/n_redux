/// gml_Object_barus_Mouse_10
action_set_relative(1);
with (r12) {
    oil = oil + 700;
}
action_effect(2, 0, 0, 1, 65280, 0);
action_kill_object();
action_set_relative(0);
