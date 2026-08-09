// gml_Object_mon_bbil_Alarm_0  locals=1 args=0 len=216
// locals: arguments
00000000: push.imm.e 0
00000004: conv.i.v
00000008: call action_set_relative(argc=1)
00000010: popz
00000014: push.d 0.1
00000020: conv.d.v
00000024: push.imm.e 90
00000028: conv.i.v
0000002C: call action_set_gravity(argc=2)
00000034: popz
00000038: push.imm.e 1
0000003C: conv.i.v
00000040: push.imm.e 0
00000044: conv.i.v
00000048: push.imm.e 1023
0000004C: conv.i.v
00000050: call action_sprite_set(argc=3)
00000058: popz
0000005C: push.imm.e 1
00000060: conv.i.v
00000064: call action_set_relative(argc=1)
0000006C: popz
00000070: push.imm.e 0
00000074: conv.i.v
00000078: push.imm.e 0
0000007C: conv.i.v
00000080: push.imm.e 121
00000084: conv.i.v
00000088: call action_create_object(argc=3)
00000090: popz
00000094: push.imm.e 0
00000098: conv.i.v
0000009C: call action_set_relative(argc=1)
000000A4: popz
000000A8: push.imm.e 1
000000AC: conv.i.v
000000B0: push.imm.e 1000
000000B4: conv.i.v
000000B8: call action_set_alarm(argc=2)
000000C0: popz
000000C4: push.imm.e 0
000000C8: conv.i.v
000000CC: call action_set_relative(argc=1)
000000D4: popz