// gml_Object_iconic_box_Step_0  locals=2 args=0 len=720
// locals: arguments, __b__
00000000: push.imm.e 0
00000004: conv.i.v
00000008: push.imm.e 1
0000000C: conv.i.v
00000010: push.global.v global.hc
00000018: call action_if_variable(argc=3)
00000020: pop.v.v local.__b__
00000028: push.local.v local.__b__
00000030: conv.v.b
00000034: bf 0x21EB92C
00000038: push.imm.e 2
0000003C: conv.i.v
00000040: push.imm.e 0
00000044: conv.i.v
00000048: push.imm.e 734
0000004C: conv.i.v
00000050: call action_if_number(argc=3)
00000058: pop.v.v local.__b__
00000060: push.local.v local.__b__
00000068: conv.v.b
0000006C: bf 0x21EB7F4
00000070: push.imm.e 156
00000074: pushenv 0x21EB7CC
00000078: push.imm.e 2
0000007C: conv.i.v
00000080: push.imm.e 0
00000084: conv.i.v
00000088: push.v crys
00000090: call action_if_variable(argc=3)
00000098: pop.v.v local.__b__
000000A0: push.local.v local.__b__
000000A8: conv.v.b
000000AC: bf 0x21EB7CC
000000B0: b 0x21EB7D4
000000B4: popenv 0x41EB790
000000B8: b 0x21EB7D8
000000BC: popenv 0x1DEB7D4
000000C0: push.local.v local.__b__
000000C8: conv.v.b
000000CC: bf 0x21EB7F4
000000D0: push.imm.e 1330
000000D4: pop.v.i image_index
000000DC: push.imm.e 156
000000E0: pushenv 0x21EB838
000000E4: push.imm.e 2
000000E8: conv.i.v
000000EC: push.imm.e 0
000000F0: conv.i.v
000000F4: push.v biotech
000000FC: call action_if_variable(argc=3)
00000104: pop.v.v local.__b__
0000010C: push.local.v local.__b__
00000114: conv.v.b
00000118: bf 0x21EB838
0000011C: b 0x21EB840
00000120: popenv 0x41EB7FC
00000124: b 0x21EB844
00000128: popenv 0x1DEB840
0000012C: push.local.v local.__b__
00000134: conv.v.b
00000138: bf 0x21EB860
0000013C: push.imm.e 1330
00000140: pop.v.i image_index
00000148: push.imm.e 156
0000014C: pushenv 0x21EB8A4
00000150: push.imm.e 3
00000154: conv.i.v
00000158: push.imm.e 0
0000015C: conv.i.v
00000160: push.v crys
00000168: call action_if_variable(argc=3)
00000170: pop.v.v local.__b__
00000178: push.local.v local.__b__
00000180: conv.v.b
00000184: bf 0x21EB8A4
00000188: b 0x21EB8AC
0000018C: popenv 0x41EB868
00000190: b 0x21EB8B0
00000194: popenv 0x1DEB8AC
00000198: push.local.v local.__b__
000001A0: conv.v.b
000001A4: bf 0x21EB92C
000001A8: push.imm.e 156
000001AC: pushenv 0x21EB904
000001B0: push.imm.e 3
000001B4: conv.i.v
000001B8: push.imm.e 0
000001BC: conv.i.v
000001C0: push.v biotech
000001C8: call action_if_variable(argc=3)
000001D0: pop.v.v local.__b__
000001D8: push.local.v local.__b__
000001E0: conv.v.b
000001E4: bf 0x21EB904
000001E8: b 0x21EB90C
000001EC: popenv 0x41EB8C8
000001F0: b 0x21EB910
000001F4: popenv 0x1DEB90C
000001F8: push.local.v local.__b__
00000200: conv.v.b
00000204: bf 0x21EB92C
00000208: push.imm.e 1329
0000020C: pop.v.i sprite_index
00000214: push.imm.e -1
00000218: push.imm.e 0
0000021C: push.v obj0.view_yview[array]
00000224: push.imm.e 20
00000228: push.global.v global.sca
00000230: mul.v.i
00000234: add.v.v
00000238: push.global.v global.upp
00000240: add.v.v
00000244: push.imm.e -1
00000248: push.imm.e 0
0000024C: push.v obj0.view_xview[array]
00000254: call action_move_to(argc=2)
0000025C: popz
00000260: push.imm.e 0
00000264: conv.i.v
00000268: push.imm.e 0
0000026C: conv.i.v
00000270: push.global.v global.sca
00000278: push.global.v global.sca
00000280: call action_sprite_transform(argc=4)
00000288: popz
0000028C: push.imm.e 0
00000290: conv.i.v
00000294: push.imm.e 0
00000298: conv.i.v
0000029C: push.global.v global.hc
000002A4: call action_if_variable(argc=3)
000002AC: pop.v.v local.__b__
000002B4: push.local.v local.__b__
000002BC: conv.v.b
000002C0: bf 0x21EB9E8
000002C4: push.imm.e 518
000002C8: pop.v.i sprite_index