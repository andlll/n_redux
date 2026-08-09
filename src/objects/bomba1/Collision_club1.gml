/// gml_Object_bomba1_Collision_202
// locals: __b__
action_set_relative(1);
__b__ = action_if_variable(arm, 1, 0);
if (__b__) {
    with (other.id) {
        life = life + -100;
    }
}
action_set_relative(0);
