// gml_Object_tincom_Alarm_2  locals=1 args=0 len=64
// locals: arguments
00000000: push.imm.e 2
00000004: conv.i.v
00000008: push.imm.e 60
0000000C: conv.i.v
00000010: call action_set_alarm(argc=2)
00000018: popz
0000001C: push.imm.e 1
00000020: conv.i.v
00000024: push.imm.e 0
00000028: conv.i.v
0000002C: push.imm.e 1339
00000030: conv.i.v
00000034: call action_sprite_set(argc=3)
0000003C: popz