// gml_Object_r320_Create_0  locals=2 args=0 len=672
// locals: arguments, __b__
00000000: push.imm.e 455
00000004: pushenv 0x20CAFEC
00000008: push.imm.e 0
0000000C: conv.i.v
00000010: push.imm.e 1
00000014: conv.i.v
00000018: push.v night
00000020: call action_if_variable(argc=3)
00000028: pop.v.v local.__b__
00000030: push.local.v local.__b__
00000038: conv.v.b
0000003C: bf 0x20CAFEC
00000040: b 0x20CAFF4
00000044: popenv 0x40CAFB0
00000048: b 0x20CAFF8
0000004C: popenv 0x1CCAFF4
00000050: push.local.v local.__b__
00000058: conv.v.b
0000005C: bf 0x20CB028
00000060: push.imm.e 1
00000064: conv.i.v
00000068: push.i 16366009
00000070: conv.i.v
00000074: call action_sprite_color(argc=2)
0000007C: popz
00000080: push.imm.e 455
00000084: pushenv 0x20CB06C
00000088: push.imm.e 0
0000008C: conv.i.v
00000090: push.imm.e 1
00000094: conv.i.v
00000098: push.v dawn
000000A0: call action_if_variable(argc=3)
000000A8: pop.v.v local.__b__
000000B0: push.local.v local.__b__
000000B8: conv.v.b
000000BC: bf 0x20CB06C
000000C0: b 0x20CB074
000000C4: popenv 0x40CB030
000000C8: b 0x20CB078
000000CC: popenv 0x1CCB074
000000D0: push.local.v local.__b__
000000D8: conv.v.b
000000DC: bf 0x20CB0A8
000000E0: push.imm.e 1
000000E4: conv.i.v
000000E8: push.i 15201023
000000F0: conv.i.v
000000F4: call action_sprite_color(argc=2)
000000FC: popz
00000100: push.imm.e 465
00000104: conv.i.v
00000108: push.v y
00000110: push.imm.e 585
00000114: add.i.v
00000118: push.v x
00000120: push.imm.e 453
00000124: add.i.v
00000128: call instance_create(argc=3)
00000130: popz
00000134: push.imm.e 465
00000138: conv.i.v
0000013C: push.v y
00000144: push.imm.e 585
00000148: add.i.v
0000014C: push.v x
00000154: push.imm.e 551
00000158: add.i.v
0000015C: call instance_create(argc=3)
00000164: popz
00000168: push.imm.e 465
0000016C: conv.i.v
00000170: push.v y
00000178: push.imm.e 440
0000017C: add.i.v
00000180: push.v x
00000188: push.imm.e 802
0000018C: add.i.v
00000190: call instance_create(argc=3)
00000198: popz
0000019C: push.imm.e 465
000001A0: conv.i.v
000001A4: push.v y
000001AC: push.imm.e 413
000001B0: add.i.v
000001B4: push.v x
000001BC: push.imm.e 850
000001C0: add.i.v
000001C4: call instance_create(argc=3)
000001CC: popz
000001D0: push.imm.e 465
000001D4: conv.i.v
000001D8: push.v y
000001E0: push.imm.e 556
000001E4: add.i.v
000001E8: push.v x
000001F0: push.imm.e 1001
000001F4: add.i.v
000001F8: call instance_create(argc=3)
00000200: popz
00000204: push.imm.e 465
00000208: conv.i.v
0000020C: push.v y
00000214: push.imm.e 528
00000218: add.i.v
0000021C: push.v x
00000224: push.imm.e 1051
00000228: add.i.v
0000022C: call instance_create(argc=3)
00000234: popz
00000238: push.imm.e 465
0000023C: conv.i.v
00000240: push.v y
00000248: push.imm.e 583
0000024C: add.i.v
00000250: push.v x
00000258: push.imm.e 1051
0000025C: add.i.v
00000260: call instance_create(argc=3)
00000268: popz
0000026C: push.imm.e 465
00000270: conv.i.v
00000274: push.v y
0000027C: push.imm.e 556
00000280: add.i.v
00000284: push.v x
0000028C: push.imm.e 1099
00000290: add.i.v
00000294: call instance_create(argc=3)
0000029C: popz