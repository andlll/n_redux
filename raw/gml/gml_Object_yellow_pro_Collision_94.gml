/// gml_Object_yellow_pro_Collision_94
// locals: __b__
action_set_relative(1);
with (other.id) {
    life = life + -0.1;
}
with (other.id) {
    __b__ = action_if_variable(desto, 1, 0);
}
if (__b__) {
    action_kill_object();
}
with (other.id) {
    __b__ = action_if_variable(life, 0, 3);
}
if (__b__) {
    action_create_object(esplo, 0, 0);
    with (other.id) {
        action_kill_object();
    }
}
action_set_relative(0);
