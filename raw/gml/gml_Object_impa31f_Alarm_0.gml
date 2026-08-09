/// gml_Object_impa31f_Alarm_0
// locals: __b__
action_set_relative(0);
__b__ = action_if_variable(demos, 0, 0);
if (__b__) {
    action_set_alarm(24, 0);
    __b__ = action_if_variable(phase, 18, 0);
    if (__b__) {
        action_set_relative(1);
        action_create_object(impa32f, -24, -268);
        action_set_relative(0);
        action_set_relative(1);
        action_create_object(impa3gru, 1, -257);
        action_set_relative(0);
        action_set_relative(1);
        phase = phase + 1;
        action_set_relative(0);
    }
    if (phase == 1) {
        sprite_index = 42;
        phase = phase + 1;
        exit;
    }
    if (phase == 2) {
        sprite_index = 40;
        phase = phase + 1;
        exit;
    }
    if (phase == 3) {
        sprite_index = 38;
        phase = phase + 1;
        exit;
    }
    if (phase == 4) {
        sprite_index = 36;
        phase = phase + 1;
        exit;
    }
    if (phase == 5) {
        sprite_index = 34;
        phase = phase + 1;
        exit;
    }
    if (phase == 6) {
        sprite_index = 32;
        phase = phase + 1;
        exit;
    }
    if (phase == 7) {
        sprite_index = 30;
        phase = phase + 1;
        exit;
    }
    if (phase == 8) {
        sprite_index = 28;
        phase = phase + 1;
        exit;
    }
    if (phase == 9) {
        sprite_index = 26;
        phase = phase + 1;
        exit;
    }
    if (phase == 10) {
        sprite_index = 24;
        phase = phase + 1;
        exit;
    }
    if (phase == 11) {
        sprite_index = 22;
        phase = phase + 1;
        exit;
    }
    if (phase == 12) {
        sprite_index = 20;
        phase = phase + 1;
        exit;
    }
    if (phase == 13) {
        sprite_index = 18;
        phase = phase + 1;
        exit;
    }
    if (phase == 14) {
        sprite_index = 16;
        phase = phase + 1;
        exit;
    }
    if (phase == 15) {
        sprite_index = 14;
        phase = phase + 1;
        exit;
    }
    if (phase == 16) {
        sprite_index = 12;
        phase = phase + 1;
        exit;
    }
    if (phase == 17) {
        sprite_index = 10;
        phase = phase + 1;
        exit;
    }
}
with (r12) {
    __b__ = action_if_variable(ele, -1000, 2);
    if (__b__) {
        break;
    }
}
if (__b__) {
    with (r12) {
        __b__ = action_if_variable(mon, -1000, 2);
        if (__b__) {
            break;
        }
    }
    if (__b__) {
    }
}
action_set_relative(0);
