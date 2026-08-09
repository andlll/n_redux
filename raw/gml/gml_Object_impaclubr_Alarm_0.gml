/// gml_Object_impaclubr_Alarm_0
// locals: __b__
action_set_relative(0);
__b__ = action_if_variable(tic, 0, 0);
if (__b__) {
    action_sprite_set(ir12, 0, 1);
    action_set_alarm(40, 0);
    action_set_relative(1);
    tic = tic + 1;
    action_set_relative(0);
    action_set_relative(0);
    exit;
}
__b__ = action_if_variable(tic, 1, 0);
if (__b__) {
    action_sprite_set(ir11, 0, 1);
    action_set_alarm(40, 0);
    action_set_relative(1);
    tic = tic + 1;
    action_set_relative(0);
    action_set_relative(0);
    exit;
}
__b__ = action_if_variable(tic, 2, 0);
if (__b__) {
    __b__ = action_if_dice(2);
    if (__b__) {
        __b__ = action_if_dice(2);
        if (__b__) {
            action_sprite_set(ir23, 0, 1);
        } else {
            action_sprite_set(ir24, 0, 1);
        }
    } else {
        __b__ = action_if_dice(2);
        if (__b__) {
            action_sprite_set(ir25, 0, 1);
        } else {
            action_sprite_set(ir26, 0, 1);
        }
    }
    action_set_alarm(40, 0);
    action_set_relative(1);
    tic = tic + 1;
    action_set_relative(0);
    action_set_relative(0);
    exit;
}
__b__ = action_if_variable(tic, 3, 0);
if (__b__) {
    action_sprite_set(ir22, 0, 1);
    action_set_alarm(40, 0);
    action_set_relative(1);
    tic = tic + 1;
    action_set_relative(0);
    action_set_relative(0);
    exit;
}
__b__ = action_if_variable(tic, 4, 0);
if (__b__) {
    action_sprite_set(ir21, 0, 1);
    action_set_alarm(600, 0);
    action_set_relative(1);
    tic = tic + 1;
    action_set_relative(0);
    action_set_relative(0);
    exit;
}
__b__ = action_if_variable(tic, 5, 0);
if (__b__) {
    action_set_alarm(40, 0);
    action_set_relative(1);
    tic = tic + 1;
    action_set_relative(0);
    action_set_relative(0);
    exit;
}
__b__ = action_if_variable(tic, 6, 0);
if (__b__) {
    __b__ = action_if_dice(2);
    if (__b__) {
        __b__ = action_if_dice(2);
        if (__b__) {
            action_sprite_set(ir23, 0, 1);
        } else {
            action_sprite_set(ir24, 0, 1);
        }
    } else {
        __b__ = action_if_dice(2);
        if (__b__) {
            action_sprite_set(ir25, 0, 1);
        } else {
            action_sprite_set(ir26, 0, 1);
        }
    }
    action_set_alarm(40, 0);
    action_set_relative(1);
    tic = tic + 1;
    action_set_relative(0);
    action_set_relative(0);
    exit;
}
__b__ = action_if_variable(tic, 7, 0);
if (__b__) {
    action_sprite_set(ir11, 0, 1);
    action_set_alarm(40, 0);
    action_set_relative(1);
    tic = tic + 1;
    action_set_relative(0);
    action_set_relative(0);
    exit;
}
__b__ = action_if_variable(tic, 8, 0);
if (__b__) {
    action_sprite_set(ir12, 0, 1);
    action_set_alarm(40, 0);
    action_set_relative(1);
    tic = tic + 1;
    action_set_relative(0);
    action_set_relative(0);
    exit;
}
__b__ = action_if_variable(tic, 9, 0);
if (__b__) {
    __b__ = action_if_dice(2);
    if (__b__) {
        __b__ = action_if_dice(2);
        if (__b__) {
            action_sprite_set(ir13, 0, 1);
        } else {
            action_sprite_set(ir14, 0, 1);
        }
    } else {
        __b__ = action_if_dice(2);
        if (__b__) {
            action_sprite_set(ir15, 0, 1);
        } else {
            action_sprite_set(ir16, 0, 1);
        }
    }
    action_set_alarm(40, 0);
    action_set_relative(1);
    tic = tic + 1;
    action_set_relative(0);
    action_set_relative(0);
    exit;
}
__b__ = action_if_variable(tic, 10, 0);
if (__b__) {
    action_kill_object();
}
action_set_relative(0);
