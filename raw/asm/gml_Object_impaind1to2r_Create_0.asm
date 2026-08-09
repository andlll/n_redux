// gml_Object_impaind1to2r_Create_0  locals=2 args=0 len=744
// locals: arguments, __b__
00000000: push.imm.e 0
00000004: conv.i.v
00000008: call action_set_relative(argc=1)
00000010: popz
00000014: push.imm.e 0
00000018: pop.v.i tic
00000020: push.imm.e 455
00000024: pushenv 0x215DB48
00000028: push.imm.e 0
0000002C: conv.i.v
00000030: push.imm.e 1
00000034: conv.i.v
00000038: push.v night
00000040: call action_if_variable(argc=3)
00000048: pop.v.v local.__b__
00000050: push.local.v local.__b__
00000058: conv.v.b
0000005C: bf 0x215DB48
00000060: b 0x215DB50
00000064: popenv 0x415DB0C
00000068: b 0x215DB54
0000006C: popenv 0x1D5DB50
00000070: push.local.v local.__b__
00000078: conv.v.b
0000007C: bf 0x215DB84
00000080: push.imm.e 1
00000084: conv.i.v
00000088: push.i 16366009
00000090: conv.i.v
00000094: call action_sprite_color(argc=2)
0000009C: popz
000000A0: push.imm.e 455
000000A4: pushenv 0x215DBC8
000000A8: push.imm.e 0
000000AC: conv.i.v
000000B0: push.imm.e 1
000000B4: conv.i.v
000000B8: push.v dawn
000000C0: call action_if_variable(argc=3)
000000C8: pop.v.v local.__b__
000000D0: push.local.v local.__b__
000000D8: conv.v.b
000000DC: bf 0x215DBC8
000000E0: b 0x215DBD0
000000E4: popenv 0x415DB8C
000000E8: b 0x215DBD4
000000EC: popenv 0x1D5DBD0
000000F0: push.local.v local.__b__
000000F8: conv.v.b
000000FC: bf 0x215DC04
00000100: push.imm.e 1
00000104: conv.i.v
00000108: push.i 15201023
00000110: conv.i.v
00000114: call action_sprite_color(argc=2)
0000011C: popz
00000120: push.v y
00000128: neg.v.d
0000012C: push.imm.e 1
00000130: add.i.v
00000134: pop.v.v depth
0000013C: push.imm.e 0
00000140: conv.i.v
00000144: push.imm.e 30
00000148: conv.i.v
0000014C: call action_set_alarm(argc=2)
00000154: popz
00000158: push.imm.e 10
0000015C: conv.i.v
00000160: push.imm.e 20
00000164: conv.i.v
00000168: call action_set_alarm(argc=2)
00000170: popz
00000174: push.imm.e 2
00000178: conv.i.v
0000017C: call action_if_dice(argc=1)
00000184: pop.v.v local.__b__
0000018C: push.local.v local.__b__
00000194: conv.v.b
00000198: bf 0x215DCF8
0000019C: push.imm.e 2
000001A0: conv.i.v
000001A4: call action_if_dice(argc=1)
000001AC: pop.v.v local.__b__
000001B4: push.local.v local.__b__
000001BC: conv.v.b
000001C0: bf 0x215DCD0
000001C4: push.imm.e 1
000001C8: conv.i.v
000001CC: push.imm.e 0
000001D0: conv.i.v
000001D4: push.imm.e 289
000001D8: conv.i.v
000001DC: call action_sprite_set(argc=3)
000001E4: popz
000001E8: b 0x215DCF4
000001EC: push.imm.e 1
000001F0: conv.i.v
000001F4: push.imm.e 0
000001F8: conv.i.v
000001FC: push.imm.e 290
00000200: conv.i.v
00000204: call action_sprite_set(argc=3)
0000020C: popz
00000210: b 0x215DD6C
00000214: push.imm.e 2
00000218: conv.i.v
0000021C: call action_if_dice(argc=1)
00000224: pop.v.v local.__b__
0000022C: push.local.v local.__b__
00000234: conv.v.b
00000238: bf 0x215DD48
0000023C: push.imm.e 1
00000240: conv.i.v
00000244: push.imm.e 0
00000248: conv.i.v
0000024C: push.imm.e 291
00000250: conv.i.v
00000254: call action_sprite_set(argc=3)
0000025C: popz
00000260: b 0x215DD6C
00000264: push.imm.e 1
00000268: conv.i.v
0000026C: push.imm.e 0
00000270: conv.i.v
00000274: push.imm.e 292
00000278: conv.i.v
0000027C: call action_sprite_set(argc=3)
00000284: popz
00000288: push.imm.e 1
0000028C: conv.i.v
00000290: call action_set_relative(argc=1)
00000298: popz
0000029C: push.imm.e 0
000002A0: conv.i.v
000002A4: push.imm.e 0
000002A8: conv.i.v
000002AC: push.imm.e 526
000002B0: conv.i.v
000002B4: call action_create_object(argc=3)
000002BC: popz
000002C0: push.imm.e 0
000002C4: conv.i.v
000002C8: call action_set_relative(argc=1)
000002D0: popz
000002D4: push.imm.e 0
000002D8: conv.i.v
000002DC: call action_set_relative(argc=1)
000002E4: popz