/// gml_Object_thunderclap_Step_0
// locals: __b__
__b__ = action_if_variable(over, 1, 0);
if (__b__) {
    over = 2;
    action_sprite_set(nitedis, 0, 0.5);
    action_set_alarm(120, 1);
}
