// gml_Object_imparcr_Alarm_1  locals=1 args=0 len=64
// locals: arguments
00000000: push.imm.e 1
00000004: conv.i.v
00000008: push.imm.e 0
0000000C: conv.i.v
00000010: push.imm.e 288
00000014: conv.i.v
00000018: call action_sprite_set(argc=3)
00000020: popz
00000024: push.imm.e 3
00000028: conv.i.v
0000002C: push.imm.e 30
00000030: conv.i.v
00000034: call action_set_alarm(argc=2)
0000003C: popz