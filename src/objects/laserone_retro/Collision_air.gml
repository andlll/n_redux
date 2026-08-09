/// gml_Object_laserone_retro_Collision_77
// locals: __b__
action_set_relative(1);
__b__ = action_if_variable(nocivo, 1, 0);
if (__b__) {
    with (other.id) {
        life = life + -2;
    }
    action_set_relative(0);
    nocivo = 0;
    action_set_relative(1);
}
action_set_relative(0);
dat = 1;
action_set_relative(1);
with (other.id) {
    __b__ = action_if_variable(desto, 1, 0);
}
if (__b__) {
    with (other.id) {
        action_create_object(esplo, 0, 0);
    }
}
action_set_relative(0);
