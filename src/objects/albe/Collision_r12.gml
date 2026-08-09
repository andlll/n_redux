/// gml_Object_albe_Collision_156
// locals: __b__
action_set_relative(0);
__b__ = action_if_variable(selva, 0, 0);
if (__b__) {
    selva = 1;
    __b__ = action_if_dice(3);
    if (__b__) {
        action_set_relative(1);
        action_create_object(albe2, 0, 0);
        action_set_relative(0);
        action_kill_object();
        action_set_relative(0);
        exit;
    }
    __b__ = action_if_dice(4);
    if (__b__) {
        action_set_relative(1);
        action_create_object(albe3, 0, 0);
        action_set_relative(0);
        action_kill_object();
        action_set_relative(0);
        exit;
    }
}
action_set_relative(0);
