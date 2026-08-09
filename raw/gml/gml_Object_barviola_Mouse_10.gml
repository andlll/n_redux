/// gml_Object_barviola_Mouse_10
action_set_relative(1);
with (r12) {
    crys = crys + irandom_range(1, 3);
}
action_effect(2, 0, 0, 1, 16744576, 0);
action_kill_object();
action_set_relative(0);
