// gml_Object_impa5fd_demo_Create_0  locals=2 args=0 len=636
// locals: arguments, __b__
00000000: push.imm.e 455
00000004: pushenv 0x21B3CDC
00000008: push.imm.e 0
0000000C: conv.i.v
00000010: push.imm.e 1
00000014: conv.i.v
00000018: push.v night
00000020: call action_if_variable(argc=3)
00000028: pop.v.v local.__b__
00000030: push.local.v local.__b__
00000038: conv.v.b
0000003C: bf 0x21B3CDC
00000040: b 0x21B3CE4
00000044: popenv 0x41B3CA0
00000048: b 0x21B3CE8
0000004C: popenv 0x1DB3CE4
00000050: push.local.v local.__b__
00000058: conv.v.b
0000005C: bf 0x21B3D18
00000060: push.imm.e 1
00000064: conv.i.v
00000068: push.i 16366009
00000070: conv.i.v
00000074: call action_sprite_color(argc=2)
0000007C: popz
00000080: push.imm.e 455
00000084: pushenv 0x21B3D5C
00000088: push.imm.e 0
0000008C: conv.i.v
00000090: push.imm.e 1
00000094: conv.i.v
00000098: push.v dawn
000000A0: call action_if_variable(argc=3)
000000A8: pop.v.v local.__b__
000000B0: push.local.v local.__b__
000000B8: conv.v.b
000000BC: bf 0x21B3D5C
000000C0: b 0x21B3D64
000000C4: popenv 0x41B3D20
000000C8: b 0x21B3D68
000000CC: popenv 0x1DB3D64
000000D0: push.local.v local.__b__
000000D8: conv.v.b
000000DC: bf 0x21B3D98
000000E0: push.imm.e 1
000000E4: conv.i.v
000000E8: push.i 15201023
000000F0: conv.i.v
000000F4: call action_sprite_color(argc=2)
000000FC: popz
00000100: push.v y
00000108: neg.v.d
0000010C: push.d 2.8
00000118: add.d.v
0000011C: pop.v.v depth
00000124: push.imm.e 0
00000128: pop.v.i tic
00000130: push.imm.e 2
00000134: conv.i.v
00000138: call action_if_dice(argc=1)
00000140: pop.v.v local.__b__
00000148: push.local.v local.__b__
00000150: conv.v.b
00000154: bf 0x21B3E68
00000158: push.imm.e 2
0000015C: conv.i.v
00000160: call action_if_dice(argc=1)
00000168: pop.v.v local.__b__
00000170: push.local.v local.__b__
00000178: conv.v.b
0000017C: bf 0x21B3E40
00000180: push.imm.e 1
00000184: conv.i.v
00000188: push.imm.e 0
0000018C: conv.i.v
00000190: push.imm.e 1175
00000194: conv.i.v
00000198: call action_sprite_set(argc=3)
000001A0: popz
000001A4: b 0x21B3E64
000001A8: push.imm.e 1
000001AC: conv.i.v
000001B0: push.imm.e 0
000001B4: conv.i.v
000001B8: push.imm.e 1176
000001BC: conv.i.v
000001C0: call action_sprite_set(argc=3)
000001C8: popz
000001CC: b 0x21B3EDC
000001D0: push.imm.e 2
000001D4: conv.i.v
000001D8: call action_if_dice(argc=1)
000001E0: pop.v.v local.__b__
000001E8: push.local.v local.__b__
000001F0: conv.v.b
000001F4: bf 0x21B3EB8
000001F8: push.imm.e 1
000001FC: conv.i.v
00000200: push.imm.e 0
00000204: conv.i.v
00000208: push.imm.e 1177
0000020C: conv.i.v
00000210: call action_sprite_set(argc=3)
00000218: popz
0000021C: b 0x21B3EDC
00000220: push.imm.e 1
00000224: conv.i.v
00000228: push.imm.e 0
0000022C: conv.i.v
00000230: push.imm.e 1178
00000234: conv.i.v
00000238: call action_sprite_set(argc=3)
00000240: popz
00000244: push.imm.e 0
00000248: conv.i.v
0000024C: push.imm.e 30
00000250: conv.i.v
00000254: call action_set_alarm(argc=2)
0000025C: popz
00000260: push.imm.e 10
00000264: conv.i.v
00000268: push.imm.e 20
0000026C: conv.i.v
00000270: call action_set_alarm(argc=2)
00000278: popz