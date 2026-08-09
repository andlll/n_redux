// gml_Object_yellow_pro_Create_0  locals=1 args=0 len=396
// locals: arguments
00000000: push.imm.e 1
00000004: conv.i.v
00000008: call action_set_relative(argc=1)
00000010: popz
00000014: push.imm.e 156
00000018: pushenv 0x20C1628
0000001C: push.v mon
00000024: push.imm.e -3
00000028: add.i.v
0000002C: pop.v.v mon
00000034: popenv 0x40C1610
00000038: push.imm.e 0
0000003C: conv.i.v
00000040: call action_set_relative(argc=1)
00000048: popz
0000004C: push.imm.e 0
00000050: conv.i.v
00000054: push.imm.e 1
00000058: conv.i.v
0000005C: call action_set_alarm(argc=2)
00000064: popz
00000068: push.imm.e 1
0000006C: conv.i.v
00000070: call action_set_relative(argc=1)
00000078: popz
0000007C: push.imm.e 0
00000080: conv.i.v
00000084: push.imm.e 0
00000088: conv.i.v
0000008C: push.imm.e 611
00000090: conv.i.v
00000094: call action_create_object(argc=3)
0000009C: popz
000000A0: push.imm.e 0
000000A4: conv.i.v
000000A8: call action_set_relative(argc=1)
000000B0: popz
000000B4: push.imm.e 1
000000B8: conv.i.v
000000BC: push.imm.e 50
000000C0: conv.i.v
000000C4: call action_set_alarm(argc=2)
000000CC: popz
000000D0: push.imm.e 1
000000D4: conv.i.v
000000D8: call action_set_relative(argc=1)
000000E0: popz
000000E4: push.imm.e 0
000000E8: conv.i.v
000000EC: call action_set_relative(argc=1)
000000F4: popz
000000F8: push.imm.e 60
000000FC: conv.i.v
00000100: push.imm.e 15
00000104: conv.i.v
00000108: push.v y
00000110: push.v x
00000118: call instance_nearest(argc=3)
00000120: conv.v.i
00000124: push.v [stacktop].y
0000012C: push.imm.e 15
00000130: conv.i.v
00000134: push.v y
0000013C: push.v x
00000144: call instance_nearest(argc=3)
0000014C: conv.v.i
00000150: push.v [stacktop].x
00000158: call action_move_point(argc=3)
00000160: popz
00000164: push.imm.e 1
00000168: conv.i.v
0000016C: call action_set_relative(argc=1)
00000174: popz
00000178: push.imm.e 0
0000017C: conv.i.v
00000180: call action_set_relative(argc=1)
00000188: popz