// gml_Object_ruin4s_Create_0  locals=2 args=0 len=560
// locals: arguments, __b__
00000000: push.v y
00000008: neg.v.d
0000000C: push.imm.e 3
00000010: add.i.v
00000014: pop.v.v depth
0000001C: push.imm.e 455
00000020: pushenv 0x213866C
00000024: push.imm.e 0
00000028: conv.i.v
0000002C: push.imm.e 1
00000030: conv.i.v
00000034: push.v night
0000003C: call action_if_variable(argc=3)
00000044: pop.v.v local.__b__
0000004C: push.local.v local.__b__
00000054: conv.v.b
00000058: bf 0x213866C
0000005C: b 0x2138674
00000060: popenv 0x4138630
00000064: b 0x2138678
00000068: popenv 0x1D38674
0000006C: push.local.v local.__b__
00000074: conv.v.b
00000078: bf 0x21386A8
0000007C: push.imm.e 1
00000080: conv.i.v
00000084: push.i 16366009
0000008C: conv.i.v
00000090: call action_sprite_color(argc=2)
00000098: popz
0000009C: push.imm.e 455
000000A0: pushenv 0x21386EC
000000A4: push.imm.e 0
000000A8: conv.i.v
000000AC: push.imm.e 1
000000B0: conv.i.v
000000B4: push.v dawn
000000BC: call action_if_variable(argc=3)
000000C4: pop.v.v local.__b__
000000CC: push.local.v local.__b__
000000D4: conv.v.b
000000D8: bf 0x21386EC
000000DC: b 0x21386F4
000000E0: popenv 0x41386B0
000000E4: b 0x21386F8
000000E8: popenv 0x1D386F4
000000EC: push.local.v local.__b__
000000F4: conv.v.b
000000F8: bf 0x2138728
000000FC: push.imm.e 1
00000100: conv.i.v
00000104: push.i 15201023
0000010C: conv.i.v
00000110: call action_sprite_color(argc=2)
00000118: popz
0000011C: push.imm.e 2
00000120: conv.i.v
00000124: call action_if_dice(argc=1)
0000012C: pop.v.v local.__b__
00000134: push.local.v local.__b__
0000013C: conv.v.b
00000140: bf 0x21387C8
00000144: push.imm.e 2
00000148: conv.i.v
0000014C: call action_if_dice(argc=1)
00000154: pop.v.v local.__b__
0000015C: push.local.v local.__b__
00000164: conv.v.b
00000168: bf 0x21387A0
0000016C: push.imm.e 1
00000170: conv.i.v
00000174: push.imm.e 0
00000178: conv.i.v
0000017C: push.imm.e 362
00000180: conv.i.v
00000184: call action_sprite_set(argc=3)
0000018C: popz
00000190: b 0x21387C4
00000194: push.imm.e 1
00000198: conv.i.v
0000019C: push.imm.e 0
000001A0: conv.i.v
000001A4: push.imm.e 363
000001A8: conv.i.v
000001AC: call action_sprite_set(argc=3)
000001B4: popz
000001B8: b 0x213883C
000001BC: push.imm.e 2
000001C0: conv.i.v
000001C4: call action_if_dice(argc=1)
000001CC: pop.v.v local.__b__
000001D4: push.local.v local.__b__
000001DC: conv.v.b
000001E0: bf 0x2138818
000001E4: push.imm.e 1
000001E8: conv.i.v
000001EC: push.imm.e 0
000001F0: conv.i.v
000001F4: push.imm.e 364
000001F8: conv.i.v
000001FC: call action_sprite_set(argc=3)
00000204: popz
00000208: b 0x213883C
0000020C: push.imm.e 1
00000210: conv.i.v
00000214: push.imm.e 0
00000218: conv.i.v
0000021C: push.imm.e 365
00000220: conv.i.v
00000224: call action_sprite_set(argc=3)
0000022C: popz