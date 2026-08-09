/// gml_Object_cargomaker_Step_0
// locals: __b__
action_set_relative(1);
__b__ = action_if_dice(4);
if (__b__) {
    action_create_object(cargo1, 0, 0);
    action_kill_object();
    action_set_relative(0);
    exit;
}
__b__ = action_if_dice(4);
if (__b__) {
    action_create_object(cargo2, 0, 0);
    action_kill_object();
    action_set_relative(0);
    exit;
}
__b__ = action_if_dice(4);
if (__b__) {
    action_create_object(cargo4, 0, 0);
    action_kill_object();
    action_set_relative(0);
    exit;
}
__b__ = action_if_dice(4);
if (__b__) {
    action_create_object(cargo3, 0, 0);
    action_kill_object();
    action_set_relative(0);
    exit;
}
action_set_relative(0);
