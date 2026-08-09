/// gml_Object_dirig_Step_0
// locals: __b__
action_set_relative(0);
__b__ = action_if_variable(life, 0, 3);
if (__b__) {
    __b__ = action_if_variable(piro, 0, 0);
    if (__b__) {
        action_set_motion(-18, 1.5);
        action_sprite_set(dirspr_distrutto, 0, 1);
        piro = 1;
        action_set_alarm(85, 1);
    }
    __b__ = action_if_dice(45);
    if (__b__) {
        action_set_relative(1);
        action_create_object(esplo, 0, 0);
        action_set_relative(0);
    }
    __b__ = action_if_dice(45);
    if (__b__) {
        action_set_relative(1);
        action_create_object(esplo, 90, -30);
        action_set_relative(0);
    }
    __b__ = action_if_dice(45);
    if (__b__) {
        action_set_relative(1);
        action_create_object(esplo, -90, 30);
        action_set_relative(0);
    }
    __b__ = action_if_dice(45);
    if (__b__) {
        action_set_relative(1);
        action_create_object(esplo, -120, 40);
        action_set_relative(0);
    }
    __b__ = action_if_dice(45);
    if (__b__) {
        action_set_relative(1);
        action_create_object(esplo, 120, -40);
        action_set_relative(0);
    }
}
action_set_relative(0);
